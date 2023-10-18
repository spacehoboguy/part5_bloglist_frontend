const Notification = ({notiColor, message}) => {
    return (
        <div 
        style={{color:`${notiColor}`, textTransform:"uppercase",fontWeight:"bold", padding:5, }}
        >
            {message}
        </div>
    )
}

export default Notification