
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataChart from './Chart';
import {storesAnalytics} from '../../apis/Store'
import { formattedDate } from '../../utility/DateFormatter';
export default function AdminDashboard() {
  const { token } = useSelector((state) => state.auth);

  const [analysis,setAnalysis]=useState({});

  async function fetchAnalytics(){
    const res=await storesAnalytics(token)
    if(res)
    setAnalysis(res);
  }
  useEffect(()=>{
     fetchAnalytics(token);
  },[])
  return (
    <div className="flex flex-col  max-w-full h-full bg-[#ededed] p-5">
      <header className="flex flex-col gap-3 mb-5">
        <h2 className="text-3xl font-normal text-[#161D29]">Welcome On Rating Management App</h2>
        <div className="w-full flex justify-end">
          <span className="mr-4 text-[rgb(239,68,68)] text-xl font-medium">{formattedDate(new Date())}</span>
        </div>
      </header>
      <section className="my-4 flex h-[350px] space-x-4">
          {/* Render chart / graph */}
          {analysis?.totalUser > 0 || analysis?.totalStores > 0 ||analysis?.totalRatingSubmitted? (
            <DataChart data={analysis}/>
          ) : (
            <div className="flex-1 rounded-md bg-[#161D29] p-6">
              <p className="text-lg font-bold text-[#F1F2FF]">Visualize</p>
              <p className="mt-4 text-xl font-medium text-[#C5C7D4]">
                Not Enough Data To Visualize
              </p>
            </div>
          )}
          {/* Total Statistics */}
          <div className="flex min-w-[250px] flex-col rounded-md bg-[#161D29] p-6">
            <p className="text-lg font-bold text-[#F1F2FF]">Statistics</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-lg text-[#999DAA]">Total Users</p>
                <p className="text-3xl font-semibold text-[#C5C7D4]">{analysis?.totalUser?analysis?.totalUser:0}</p>
              </div>
              <div>
                <p className="text-lg text-[#999DAA]">Total Stores</p>
                <p className="text-3xl font-semibold text-[#C5C7D4]">{analysis?.totalStores?analysis.totalStores:0}</p>
              </div>
              <div>
                <p className="text-lg text-[#999DAA]">Total User Submitted Rating</p>
                <p className="text-3xl font-semibold text-[#C5C7D4]">{analysis?.totalRating?analysis.totalRating:0}</p>
              </div>
            </div>
          </div>
      </section>
    </div>
  )
}
