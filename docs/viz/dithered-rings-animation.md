# Dithered Rings — анимация на Canvas

Реализовано в `busy/src/components/viz/DitheredRings.tsx`.  
Используется на About page как hero-элемент.

Вдохновение: анимация логотипа на [linear.app/next](https://linear.app/next).

---

## Что это

HTML5 Canvas 2D-анимация четырёх BUSY-колец (`r0`–`r3`) в виде точечного (stipple) паттерна.  
Каждое кольцо — это N точек, расставленных по окружности с небольшим дрожанием (jitter).  
Точки реагируют на мышь и щелчки.

---

## Архитектура

### 1. Генерация точек (`buildState`)

Точки генерируются **программно** в момент инициализации — не pre-baked, а вычисляются из геометрии колец.

```
Для каждого кольца:
  R = radius × scale                         // физический радиус в CSS px
  n = floor(2π × radius_logical / spacing)   // кол-во точек (постоянно при любом масштабе)
  
  Для каждой точки i из n:
    a = (i/n × 2π) + angularJitter           // угол с небольшим шумом
    bx[i] = cx + cos(a) × (R + radialJitter)
    by[i] = cy + sin(a) × (R + radialJitter)
```

Итого ~608 точек при SIZE=320:
- r0 (r=28): ~46 точек
- r1 (r=74): ~122 точки
- r2 (r=118): ~195 точек
- r3 (r=156): ~258 точек

Все позиции хранятся в `Float32Array` для минимального расхода памяти и максимальной скорости.

### 2. Цвета

Цвета точек берутся из CSS-переменных дизайн-системы (`--ring-0` … `--ring-3`) через создание временного DOM-элемента:

```ts
function resolveCSSColor(varName: string): string {
  const el = document.createElement('span')
  el.style.cssText = `position:absolute;visibility:hidden;color:var(${varName})`
  document.body.appendChild(el)
  const val = getComputedStyle(el).color  // → 'rgb(175, 48, 41)'
  el.remove()
  return val
}
```

Почему так: `canvas.fillStyle` не понимает CSS custom properties. `getComputedStyle` resolve-ит `var()` только через стандартное свойство (здесь — `color`), а не напрямую.

При смене темы (`data-theme` на `<html>`) `MutationObserver` пересоздаёт состояние с новыми цветами.

### 3. Рендер (каждый кадр)

```ts
ctx.clearRect(0, 0, w, h)
const ds = DOT_SIZE × scale  // квадрат со стороной ~2px

for each ring:
  ctx.fillStyle = ring.color  // одна смена цвета на всё кольцо
  for each dot i:
    ctx.fillRect(bx[i] + dx[i] − ds/2, by[i] + dy[i] − ds/2, ds, ds)
```

Точки рисуются квадратиками (`fillRect`), не кругами — это быстрее и создаёт характерную текстуру, идентичную оригинальному linear.app.

### 4. Физика мыши (mouse repulsion)

При наведении мыши каждая точка вычисляет расстояние до курсора.  
Если расстояние < `MOUSE_R` (88 лог. px) — применяется кубическая сила отталкивания:

```
ex = pointX − mouseX,  ey = pointY − mouseY
d  = sqrt(ex² + ey²)
t  = 1 − d / MOUSE_R                        // 0..1 (ближе → больше)
f  = t³ × MOUSE_F × scale                   // кубическая кривая → плавный край
tx += (ex/d) × f                             // направление от мыши
```

Смещение не применяется мгновенно — оно интерполируется (lerp) с коэффициентом `LERP=0.10`:

```
dx[i] += (tx − dx[i]) × 0.10
```

Это создаёт эффект пружины: точки медленно уходят от мыши и медленно возвращаются.  
Рендерится позиция: `bx[i] + dx[i]`.

### 5. Шоквейв (click shockwave)

По клику создаётся объект волны `{x, y, t0}`. В каждом кадре:

```
front = (ts − t0) / 1000 × WAVE_SPEED × scale   // радиус фронта волны в CSS px
falloff = 1 − (ts − t0) / WAVE_DUR               // затухание 1..0

для каждой точки:
  d   = расстояние от базовой позиции до центра волны
  gap = |d − front|                               // насколько точка близка к фронту
  
  if gap < WAVE_WIDTH:
    f = (1 − gap/WAVE_WIDTH) × falloff × WAVE_FORCE × scale
    tx += (ex/d) × f                              // радиальное смещение
```

Волна расходится от центра клика, проходит сквозь все 4 кольца, постепенно затухает за 1800ms.

### 6. Animation loop

```ts
function frame(ts: number) {
  // physics + render
  
  if (mActive || hasDx) {
    raf = requestAnimationFrame(frame)  // продолжаем только если что-то движется
  }
  // иначе — цикл останавливается, не жжёт CPU
}
```

RAF запускается только при наличии движения. В покое анимация не работает.

---

## Параметры

| Константа | Значение | Смысл |
|---|---|---|
| `SIZE` | 320 | Логическое пространство (px) |
| `DOT_SIZE` | 2.0 | Сторона квадрата точки (лог. px) |
| `JITTER` | 1.0 | Амплитуда позиционного шума |
| `LERP` | 0.10 | Скорость пружины возврата |
| `MOUSE_R` | 88 | Радиус влияния мыши (лог. px) |
| `MOUSE_F` | 36 | Сила отталкивания мыши |
| `WAVE_SPEED` | 185 | Скорость волны (лог. px/s) |
| `WAVE_WIDTH` | 28 | Ширина полосы волны (лог. px) |
| `WAVE_FORCE` | 24 | Сила волнового смещения |
| `WAVE_DUR` | 1800 | Продолжительность волны (ms) |

---

## Отличие от Linear

| | Linear | BUSY Rings |
|---|---|---|
| Точки | Pre-baked bitmap dithering (офлайн) | Генерируются программно из геометрии колец |
| Форма | Произвольный логотип | Четыре концентрические окружности |
| Цвет | Один цвет, вариации яркости | Четыре цвета (по одному на кольцо) |
| Бакеты яркости | 126 бакетов для batch render | Один `fillStyle` на кольцо |
| Масштаб | 500×500 canvas | 320 лог. px, адаптивный |

---

## Адаптивность и темизация

- `window.devicePixelRatio` — canvas масштабируется под Retina
- `window.resize` — пересчитывает позиции и масштаб
- `MutationObserver` на `data-theme` — обновляет цвета при смене темы
- Все цвета через `--ring-N` токены, ни одного хардкоженного hex
