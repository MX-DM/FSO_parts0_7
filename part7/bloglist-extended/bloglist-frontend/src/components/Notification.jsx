import { useSelector } from 'react-redux'

const Notification = () => {
    const { content, type } = useSelector(state => state.notification)
    let notiClass = ''

    if (type === 's') {
        notiClass = 'messageSuccess'
    }
    else if (type === 'e') {
        notiClass = 'messageError'
    }

    if (!content) return null

    return (
        <div className={notiClass}>
            {content}
        </div>
    )
}

export default Notification
