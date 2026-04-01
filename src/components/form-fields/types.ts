import type { HTMLAttributes } from 'react'

export type FieldProps = {
  error?: string;
} & HTMLAttributes<HTMLInputElement>;