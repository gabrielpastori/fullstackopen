const Notification = ({ message, alertColor }) => {
    const messageStyle = {
        color: alertColor,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        boderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',

    }
    if (message === null) {
        return null
    }
    return (
        <div style={messageStyle}>
            <p>{message}</p>
        </div>
    )
}

export default Notification;