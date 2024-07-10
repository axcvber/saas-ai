'use client'

import ErrorSection from '@/components/states/error-section'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorSection errorMessage={error.message} resetCallback={reset} />
}
