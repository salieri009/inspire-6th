const renderingPage = () => {

    //script
    const [flag, setFlag] = useState(false);
    //
    //ui
    return (<div>
        <Greeting flag={flag} />
        
    </div>
    )
}
export default renderingPage;
