import React from 'react'
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import '../styles/Details.css'
const Details = () => {
    // getting the id from the params
    const { id } = useParams();

    // fetching data
const fetchData = async () => {
    const res = await fetch(`https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetRegVehiclePolicyDetailsById?Id=${id}`);
    return res.json();
  }
  const {
      isLoading,
      isError,
      error,
      data,
    } = useQuery(['users'], () => fetchData());

    
    // is loading state
if (isLoading) {
    return <h2>Loading...</h2>
  }

//   is error page
  if (isError) {
    return <h2>{error.message}</h2>
  }
 


  return (
      <div>
          
          { data && data.RegisteredVehicleInfoModel.map( img => (
            <div key={img.certificateNo} className='car-img'>
                {/* backview image */}
                  <div className='img-card'>
                    <img src={`data:image/png;base64, ${img.BackViewUrl}`} alt=''/>
                      <span>Back View</span>
                </div>

                {/* frontview image */}
                <div className='img-card'>
                    <img src={`data:image/png;base64, ${img.FrontViewUrl}`} alt=''/>
                    <span>Front View</span>
                </div>

                {/* leftside view image */}
                <div className='img-card'>
                <img src={`data:image/png;base64, ${img.LeftSideViewUrl}`} alt=''/>
                <span>Left side View</span>
                </div>


                {/* rightside view image */}
                <div className='img-card'>
                <img src={`data:image/png;base64,  ${img.RightSideViewUrl}`} alt=''/>
                <span>Right Side View</span>
                </div>
            </div>


           
        ))  }
         
          {/* vehicle details */}

            <div className='details'>
              <div>
                  <span>
                     {" User's Name:"}
                  </span>
                  <span>{`${data.Firstname} ${data.Surname}` }</span>
            </div>

            <div>
                  <span>
                     Email:
                  </span>
                  <span>{data.Email }</span>
            </div>

            <div>
                  <span>
                     Address:
                  </span>
                  <span>{data.Address }</span>
            </div>
               
            <div>
                  <span>
                     Amount Paid:
                  </span>
                  <span>{data.AmountPaid }</span>
            </div>

            <div>
                  <span>
                     Firm ID:
                  </span>
                  <span>{data.FirmId }</span>
            </div>

            <div>
                  <span>
                     Firm Name:
                  </span>
                  <span>{data.FirmName }</span>
            </div>
              
            <div>
                  <span>
                     LocalGovernmentName:
                  </span>
                  <span>{data.LocalGovernmmentName }</span>
            </div>
                
            <div>
                  <span>
                     Phone Number:
                  </span>
                  <span>{data.Phone }</span>
            </div>
            
            <div>
                  <span>
                     Product Name:
                  </span>
                  <span>{data.ProductName }</span>
              </div>
              
              <div>
                  <span>
                     Product ID:
                  </span>
                  <span>{data.ProductId }</span>
              </div>
              
              <div>
                  <span>
                     Policy Number:
                  </span>
                  <span>{data.PolicyNumber }</span>
            </div>

            <div>
                  <span>
                     Product Plan Name:
                  </span>
                  <span>{data.ProductPlanName }</span>
            </div>


            </div>
      </div>
  )
}

export default Details