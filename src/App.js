import { useState } from 'react';
import './App.css';

function App() {

  const [targetValue, setTargetValue] = useState(null);
  const [target, setTarget] = useState(false);
  const [range, setRange] = useState(null);
  const [type, setType] = useState("Custom");
  const [arr, setArr] = useState([]);


  


  const binarySearch = async (arr, target) => {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      const x = document.getElementById(`${mid}`);
      //mid color blue border
      x.style.border = "2px solid blue";
      await sleep(1000);
      x.style.border = '1px solid black';
      if (target < arr[mid]) {
        let m = mid;
        for (m; mid > end; m++) {
          console.log(m);
          const x = document.getElementById(`${m}`);
          x.style.border = '3px solid red';
          x.style.backgroundColor = 'red';
          x.style.color = 'white';
        }
        await sleep(1500);
        end = mid - 1;
      } else if (target > arr[mid]) {
        let m = start;
        for (m; m <= mid; m++) {
          const x = document.getElementById(`${m}`);
          x.style.border = '3px solid red';
          x.style.backgroundColor = 'red';
          x.style.color = 'white';

        }
        await sleep(1500);
        start = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }


  const bubbleSort = async (arr) => {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let s = document.getElementById(`${j}`);
          let y = document.getElementById(`${j + 1}`);
          s.style.border = '1px solid red';
          y.style.border = '1px solid yellow';
          await sleep(1500);
          s.style.border = '1px solid black';
          y.style.border = '1px solid black';
          let temp = arr[j];
          arr[j] = arr[j + 1];
          s.value = arr[j + 1];
          arr[j + 1] = temp;
          y.value = temp;
        }
      }
    }

    console.log("sorting end");
    return arr;
  }


  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


  const IndexInputArray = (rangex) => {
    let list = [];
    let i = 0;
    if (arr.length !== 0) {
      for (i; i < rangex.index; i++) {
        list.push(<input id={i} key={i} className='arrayInputBox' value={arr[i]} placeholder={`arr[${i}]`} type='number' onChange={(e) => {
        }}></input>);
      }
    } else {
      for (i; i < rangex.index; i++) {
        list.push(<input id={i} key={i} className='arrayInputBox' placeholder={`arr[${i}]`} type='number' onChange={(e) => {
        }}></input>);
      }
    }

    return <div className='arrayInputList'>{list}</div>;
  }

  return (

    <div className="App" >

      <nav>
        Algorithm Visualizer(Sort and Search)
      </nav>

      <div id='layout'>
        <div id='side'>
          <input className='input' placeholder={`${range === null ? "Enter Range of Array" : ''}`} type='number' onChange={(e) => {
            try {
              let x = parseInt(e.target.value);
              if (x <= 100) {
                setRange(x);
              } else {
                if (isNaN(x)) {
                  setRange(null);
                } else {
                  alert("Array size is must less than or equal to 100 ")
                }
              }
            } catch (e) {
              alert("Array size  " + e)
            }

          }}></input>

          <select className='input' onChange={async (e) => {
            const value = e.target.value;
            setType(value);

            if (range !== null && value === "Random") {
              let i = 0;
              let len = document.querySelectorAll('.arrayInputBox');
              await sleep(1000);
              let arrx = []
              for (i; i < len.length; i++) {
                let x = Math.floor(Math.random() * 10000);
                const inputs = document.getElementById(`${i}`);
                inputs.value = x;
                arrx[i] = x;
              }
              setArr(arrx);
            }


          }}>
            <option value="Custom">Custom</option>
            <option value="Random" >Random</option>
          </select>

        </div>


        <div id='algo'>

          {range !== null && range !== "" ?
            <> <br></br>
              {target === true && targetValue !== "" && targetValue !== null ?
                <div >Target Value: {targetValue}</div> : <>
                  <input className='input' placeholder='Enter Target Value' type='number' onChange={(e) => {
                    setTargetValue(e.target.value);
                  }}></input>
                  <br></br>
                </>}</>
            : null}

          {range !== null && range !== "" ? <> <IndexInputArray index={range}></IndexInputArray>
            <br></br>
            <button className='input center' style={{ backgroundColor: "red", color: "white" }} onClick={() => {
              setRange(null);
              setTargetValue(null);
            }}>Reset</button>
            <button className='input center btn' onClick={async () => {
              let arr = [];
              let i = 0;
              let len = document.querySelectorAll('.arrayInputBox');
              for (i; i < len.length; i++) {
                const inputs = document.getElementById(`${i}`);
                if (inputs.value !== "" && inputs.value !== null) {
                  arr[i] = parseInt(inputs.value);
                } else {
                  arr[i] = 0;
                  inputs.value = 0;
                }

              }
              const sorted = await bubbleSort(arr);
              if (sorted) {
                const ret = await binarySearch(arr, targetValue);
                if (ret !== -1) {
                  const box = document.getElementById(`${ret}`);
                  box.style.backgroundColor = 'green';
                  box.style.border = "green";
                  box.style.color = "white";
                  box.style.fontSize = "18px";
                  box.style.fontWeight = "bold";
                } else {
                  let j = 0;
                  for (j; j < len.length; j++) {
                    let s = document.getElementById(`${j}`);
                    s.value = arr[j];
                    s.disabled = true;
                    s.style.backgroundColor = 'red';
                    s.style.border = "red";
                    s.style.color = "white";
                  }
                  alert("Target value not found");

                }
              }
            }}>Search</button>


          </> : null}


        </div>
      </div>


    </div>



  );
}

export default App;
