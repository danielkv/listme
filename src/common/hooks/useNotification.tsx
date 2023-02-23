import classNames from 'classnames'
import { Notification, useToaster } from 'rsuite'
import { MessageType } from 'rsuite/esm/Notification/Notification'

export function useNotification() {
    const toaster = useToaster()

    const getHeader = (type: MessageType, title?: string) => {
        if (title) return title

        switch (type) {
            case 'error':
                return 'Ocorreu um erro'
            case 'info':
                return 'Info'
            case 'success':
                return 'Sucesso'
            case 'warning':
                return 'Atenção'
        }
    }

    const getColor = (type: MessageType) => {
        switch (type) {
            case 'error':
                return 'text-red-600'
            case 'info':
                return 'text-blue-500'
            case 'success':
                return 'text-green-500'
            case 'warning':
                return 'text-green-300'
        }
    }

    const push = (message: string, type: MessageType = 'info', title?: string) => {
        const header = getHeader(type, title)
        const color = getColor(type)

        return toaster.push(
            <Notification
                className="bg-slate-800"
                header={<h4 className={classNames('text-sm', color)}>{header}</h4>}
                type={type}
            >
                <p className="text-white">{message}</p>
            </Notification>,
            {
                placement: 'bottomStart',
            }
        )
    }

    return {
        push,
        remove: toaster.remove,
        clear: toaster.clear,
    }
}
