import './Box.css'
type typeProps={
    titre:String ;
    solde:number ;  
    children : React.ReactNode ; 
}
const Box = (props:typeProps) => {
    return (
        <div className="box">
        <div className="header-box">
            {props.children}
            <label>{props.titre}</label>
        </div>
        <h1>{props.solde} <span>TND</span></h1>
    </div>
    );
}

export default Box;
