export function getErrorMessage(err: any): string {
    if (err instanceof Error) return err.message

    if (typeof err === 'string') return err

    return 'Erro inesperado'
}
