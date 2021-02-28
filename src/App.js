import './App.css';
import MainTable from './main_table';
import data from './data.json';
import React, {useRef,useEffect,useState} from "react";

function getData() {
  return data;
}

function App() {

  const headersRef = useRef([]); 
  headersRef.current = []; 
  const rowsRef = useRef([]);
  rowsRef.current = [];

  var json = getData();
  const headersText = ["Region name",
                       "Region alpha code",
                       "Value",
                       "Reference date"];

  var informationTable = [];
  var infoRow = []; 

  json.map((data) => {
    infoRow.push(data.region_name);
    infoRow.push(data.region_alpha_code);
    infoRow.push(data.value);
    infoRow.push(data.ref_date);
    informationTable.push(infoRow);
    infoRow = []; 
  });

  var isReorderActive = false;
  var infoOrigin = [];
  var posOrigin; 
  var infoDestiny = [];
  var posDestiny;


  const addHeaderToRefs = (el) =>{
    if(el!=null){
      headersRef.current.push(el);
    }
    //console.log(headersRef.current);
  };

  const addRowToRefs = (el) =>{
    if(el!=null){
      rowsRef.current.push(el);
    }
    //console.log(rowsRef.current);
  };
          
  const renderHeaders = () => {
    //HERE IS A LET !!!!!!!!!!!!!!!!!!!!!!!!
    let headers = [];
    headersText.map((header,i) => {
        headers.push(<th ref={addHeaderToRefs}>
                     <input type="text" 
                        //onChange={(header)=>{this._handleChangeEvent(header);}} 
                        onKeyPress={event => keypressHandler(event,i)} 
                        defaultValue={header}/>
                     <a href="#" onClick={handleReorderColumns(i)}>
                         <i class="fa">&#xf014;</i></a> 
                     </th>);
        return headers; 
    }); 
    return headers;
  }

  const keypressHandler = (event,currentPos) => {
    if (event.key === "Enter") {
        //this.setState({ value: this.inputRef.current.value });
        //console.log(Array.from(this.headersRef.current.cells));
        //headersRef.current[currentPos].childNodes[0].blur();
        //this.inputRef.current.blur();
        //this.inputRef.current.value = "";*/
    }
  };

  const handleReorderColumns = (currentPos) => {
    console.log(rowsRef);
    if(isReorderActive){
      posDestiny = currentPos;
      reOrderColumns(posOrigin,posDestiny);
      isReorderActive = false; 
    }else{
      posOrigin = currentPos;
      isReorderActive = true; 
    }
  }

  function reOrderColumns(posOrigin,posDestiny){
    infoOrigin = getInformationColumn(posOrigin);
    infoDestiny = getInformationColumn(posDestiny);
    for(var i = 0; i < informationTable.length; i++){
      rowsRef.current[i].cells[posOrigin].innerText = infoDestiny[i];
      rowsRef.current[i].cells[posDestiny].innerText = infoOrigin[i];
      informationTable[i][posOrigin] = infoDestiny[i];
      informationTable[i][posDestiny] = infoOrigin[i];
    }
  };

  function getInformationColumn(currentPos){
    var selectedInformation = [];
    for(var i = 0; i < informationTable.length; i++){
      selectedInformation.push(informationTable[i][currentPos]);
    }
    return selectedInformation;
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr ref={headersRef}>
              {renderHeaders()}
          </tr>
        </thead>
        <tbody>
          { informationTable.map((data, i) => {
            return (
                <tr key={i} ref={addRowToRefs}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                </tr>
            )
          })}
        </tbody>
      </table>  
    </div>
  );
}

export default App;
