import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import '../styles/Home.css'
import {Link} from 'react-router-dom'

const Home = () => {

    
const [page, setPage] = useState(1);
const [pageCount, setPageCount] = useState([]);


// fetching data
const fetchData = async (page) => {
  const res = await fetch(`https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetByFirmId?FirmId=a9a4c543-f958-4bd0-8e24-41e1d0a111e0&PageNumber=${page}&PageSize=10`);
  return res.json();
}
const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData
  } = useQuery(['users', page], () => fetchData(page), { keepPreviousData: true });

  

  //setting up pagination
  useEffect( () => {
      let pages = []
      for ( let i = 1; i <= data?.TotalPageCount; i++ ) {
          pages.push(i)
      }
  
      setPageCount(pages)
}, [data?.TotalPageCount])

  //shorten text if its too long
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };


  // loading page
if (isLoading) {
    return <h2>Loading...</h2>
  }


  // error state
  if (isError) {
    return <h2>{error.message}</h2>
  }
 


  return (
    <div>
          <h2>Data Results</h2>


    {/* table content */}
          <div className="table">
          {!isLoading && data.Items.length === 0 ? (
            <p>-- No Data found, please try again later..</p>
          ) : isFetching ? 'Fetching...' : (
            <table>
                
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>FirmName</th>
                  <th>Policy No</th>
                  <th>Phone No</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.Items.map((product, index) => {
                  const { Id, Name, FirmName, PolicyNumber, PhoneNumber } = product;
                  return (
                    <tr key={Id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(Id, 15)}</td>
                      <td>{Name}</td>
                      <td>
                        {shortenText(FirmName, 15)}
                      </td>
                      <td>{shortenText(PolicyNumber, 15)}</td>
                      <td>
                        {PhoneNumber}
                      </td>
                      <td className="icons">
                        <Link to={`/details/${Id}`}>
                          View
                        </Link>
                       
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      
                {/* pagination tabs */}
        <div className='nav btn-container'>
        <button
          onClick={() => setPage(prevState => Math.max(prevState - 1, 1))}
          disabled={page === 1}
        >Prev</button>
            
           {pageCount && <div className='pagination'>
                  { pageCount.length > 0 && pageCount.map( pag => {
                    
                     return <span key={pag } style={{backgroundColor: pag == data.CurrentPageNumber ? '#888' : 'transparent', color: pag == data.CurrentPageNumber ? 'white' : '#222'}} onClick={() => setPage(Number(pag))}>{pag }</span>
                })}
            </div>}
        <button
          onClick={() => setPage(prevState => prevState + 1)}
          disabled={page == pageCount[pageCount.length - 1]}
        >Next</button>
      </div>

          
    </div>
  )
}


export default Home