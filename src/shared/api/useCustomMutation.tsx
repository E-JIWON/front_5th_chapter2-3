import { useState, useRef } from "react"
import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query"

interface CustomMutationOptions<TData, TError, TVariables, TContext>
  extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn"> {
  debounceDelay?: number
  mutationKey?: unknown[]
}

export const useCustomMutation = <TData, TError = Error, TVariables = unknown, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: CustomMutationOptions<TData, TError, TVariables, TContext> = {},
): Omit<UseMutationResult<TData, TError, TVariables, TContext>, "mutate"> & {
  mutate: (variables: TVariables) => void
  isLoading: boolean
} => {
  const { debounceDelay = 500, mutationKey, ...mutationOptions } = options
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn,
    ...mutationOptions,
  })

  const customMutate = (variables: TVariables) => {
    if (mutation.isPending) return
    if (isLoading) return
    if (timerRef.current) clearTimeout(timerRef.current)

    setIsLoading(true)
    timerRef.current = setTimeout(() => {
      mutation.mutate(variables, {
        onSettled: () => {
          setIsLoading(false)
        },
      })
    }, debounceDelay)
  }

  return {
    ...mutation,
    mutate: customMutate,
    isLoading,
  }
}
