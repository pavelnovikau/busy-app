import { motion } from 'motion/react'

type Role = 'coach' | 'user'

interface Message {
  role: Role
  text: string
  time: string
}

const MESSAGES: Message[] = [
  { role: 'coach', text: 'Привет! Я заметил, что вчера твой лучший блок был 9:00–11:30. Хочешь запланировать сегодня то же?', time: '9:01' },
  { role: 'user', text: 'Да, звучит хорошо. У меня в 10:30 встреча.', time: '9:03' },
  { role: 'coach', text: 'Понял. Предлагаю: 9:00–10:15 глубокий фокус → 15 мин буфер → встреча 10:30. После встречи ещё один блок в 11:30?', time: '9:03' },
  { role: 'user', text: 'Отлично, договорились.', time: '9:04' },
  { role: 'coach', text: '✦ Фокус-блок 9:00–10:15 запланирован. Индикатор переключится в режим «Не беспокоить» автоматически.', time: '9:04' },
]

const QUICK_REPLIES = ['Как я сегодня?', 'Лучшие часы', 'Запустить помодоро']

export function AICoachChat() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        width: 340,
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--space-4)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--ring-3-dim)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-full)',
            background: 'var(--ring-3-dim)',
            border: '2px solid var(--ring-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-pixel)',
            fontSize: 'var(--text-sm)',
            color: 'var(--ring-3)',
            flexShrink: 0,
          }}
        >
          AI
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              color: 'var(--tx)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            AI Focus Coach
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              marginTop: 2,
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 6,
                height: 6,
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-success)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--tx-3)',
              }}
            >
              Ring 3 · AI Intelligence
            </span>
          </div>
        </div>
        {/* Focus score chip */}
        <div
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--ring-3)',
            background: 'var(--ring-3-dim)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--ring-3)',
          }}
        >
          Score 84
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          padding: 'var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          flex: 1,
        }}
      >
        {MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: msg.role === 'user'
                  ? 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)'
                  : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                background: msg.role === 'user' ? 'var(--ring-3)' : 'var(--surface-2)',
                border: msg.role === 'coach' ? '1px solid var(--border)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: msg.role === 'user' ? 'var(--bg)' : 'var(--tx)',
                  lineHeight: 1.4,
                }}
              >
                {msg.text}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--tx-3)',
                marginTop: 2,
                padding: '0 var(--space-1)',
              }}
            >
              {msg.time}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Quick replies */}
      <div
        style={{
          padding: 'var(--space-2) var(--space-4)',
          display: 'flex',
          gap: 'var(--space-2)',
          flexWrap: 'wrap',
          borderTop: '1px solid var(--border)',
        }}
      >
        {QUICK_REPLIES.map((r) => (
          <span
            key={r}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--ring-3)',
              border: '1px solid var(--ring-3)',
              background: 'var(--ring-3-dim)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
            }}
          >
            {r}
          </span>
        ))}
      </div>

      {/* Input row */}
      <div
        style={{
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex',
          gap: 'var(--space-2)',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-2)',
        }}
      >
        <div
          style={{
            flex: 1,
            padding: 'var(--space-2) var(--space-3)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-3)',
          }}
        >
          Спроси AI Coach...
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-full)',
            background: 'var(--ring-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 'var(--text-base)',
            color: 'var(--bg)',
            cursor: 'pointer',
          }}
        >
          ↑
        </div>
      </div>
    </motion.div>
  )
}
