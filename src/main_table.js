import React from "react";
import data from './data.json';

function getData() {
    return data;
}
/*
function renderHeaders(){
    let headersText = ["Region Name",
                       "Region alpha code",
                       "Value",
                       "Reference date"];

    let headers = [];

    headersText.map((header) => {
        headers.push(<th> {header} 
                     <a href="index.html"><i class="fa">&#xf040;</i></a> 
                     <a href="index.html"><i class="fa">&#xf014;</i></a> 
                     </th>);
        return headers; 
    }); 

    return headers; 

}*/
  


          
class MainTable extends React.Component {

    constructor(props) {
        super(props)
        this.headersRef = React.createRef();
        
        this.state = {
            json: [],
            headersText: ["Region name",
                          "Region alpha code",
                          "Value",
                          "Reference date"]
        }
    }
    /*
    _handleChangeEvent(val) {
        return val;
    }*/


    keypressHandler = event => {
        if (event.key === "Enter") {
            //this.setState({ value: this.inputRef.current.value });
            //console.log(Array.from(this.headersRef.current.cells));
            Array.from(this.headersRef.current.cells).map((textInput) => {
                //textInput.setState
                textInput.childNodes[0].blur();
            });
            return null;
            //this.inputRef.current.blur();
            //this.inputRef.current.value = "";
        }
    };

    selectOrderColumn= () => {

        return console.log(this.contentRef.current.children);
    };

    renderHeaders() {
        let headers = [];
        this.state.headersText.map((header,i) => {
            headers.push(<th>
                         <input type="text" 
                            //onChange={(header)=>{this._handleChangeEvent(header);}} 
                            onKeyPress={event => this.keypressHandler(event)} 
                            defaultValue={header}/>
                         <a href="#" onClick={this.selectOrderColumn}>
                             <i class="fa">&#xf014;</i></a> 
                         </th>);
            return headers; 
        }); 
    
        return headers; 
    
    }

    componentDidMount() {
        this.setState((prevState) => {
            return {
                json: getData()
            }
        })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr ref={this.headersRef}>
                            {this.renderHeaders()}
                        </tr>
                    </thead>
                    <tbody ref={this.contentRef}>
                        {this.state.json.map((data, i) => {
                        return (
                            <tr key={i}>
                            <td>{data.region_name}</td>
                            <td>{data.region_alpha_code}</td>
                            <td>{data.value}</td>
                            <td>{data.ref_date}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MainTable;






/*
const MainTable =()=>{

    function renderHeaders(){
        let headers = [];

        const dataImport = data[0]; 
        Object.keys(dataImport).map((element,i) => {
            headers.push(<td key={i.name}>{element}</td>); 
        });

        return headers; 

    }

    function renderValues(){
        let values = [];

        let res = Object.values(data);

        res.map((x, i) => {
            console.log(res[i]);
            Object.values(res[i]).map(x => {
                values.push(<td >{x}</td>);
                return values;
            });
            return values;
        });

        return values;

    }

        /*
    const RenderRow = (props) =>{
        return props.keys.map((key, index)=>{
        return <td key={props.data[key]}>{props.data[key]}</td>
        })
       }
       
       
    getRowsData = function(){
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    return(
    <React.Fragment>

        <p>Table</p>
        <table>
            <thead>
                <tr>{renderHeaders()}</tr>
            </thead>
            <tbody>
                <tr>{renderValues()}</tr>
            </tbody>                  
        </table>
    </React.Fragment> 
    )
}

export default MainTable;  */
