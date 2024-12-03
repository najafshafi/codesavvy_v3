import React from 'react';
import { Link } from 'react-router-dom';

const GetCertified = () => {
  return (
    <div className='container-fluid' id="cont">
    <div className="d-flex justify-content-end">
      <Link className='_l1' to='/'><h2 className="text-white my-5">X</h2></Link>
    </div>
    <div className='container'>
        <h2 className='my-5' style={{color:'#FFF4A3',fontWeight:'bold'}}>Get Certified</h2>
        <div className='row'>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <h3 style={{color:'#FFF4A3'}}>HTML and CSS</h3>
            <ul className='list-unstyled'>
              <li className='_links1'>HTML</li>
              <li className='_links1'>CSS</li>
              <li className='_links1'>Bootstrap</li>
            </ul>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <h3 style={{color:'#FFF4A3'}}>JavaScript</h3>
            <ul className='list-unstyled'>
              <li className='_links1'>JavaScript</li>
              <li className='_links1'>React</li>
              <li className='_links1'>JQuery</li>
              <li className='_links1'>Vue</li>
            </ul>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <h3 style={{color:'#FFF4A3'}}>Backend</h3>
            <ul className='list-unstyled'>
                <li className='_links1'>Python</li>
                <li className='_links1'>SQL</li>
                <li className='_links1'>MySQL</li>
                <li className='_links1'>PHP</li>
                <li className='_links1'>Java</li>
                <li className='_links1'>C</li>
                <li className='_links1'>C++</li>
                <li className='_links1'>C#</li>
                <li className='_links1'>R</li>
                <li className='_links1'>Kotlin</li>
                <li className='_links1'>Go</li>
                <li className='_links1'>Django</li>
                <li className='_links1'>PostgreSQL</li>
                <li className='_links1'>TypeScript</li>
                <li className='_links1'>ASP</li>
                <li className='_links1'>Node.js</li>
                <li className='_links1'>Raspberry</li>
                <li className='_links1'>Git</li>
                <li className='_links1'>MongoDB</li>
                <li className='_links1'>AWS cloud</li>
                <li className='_links1'>XML</li>
              </ul>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <h3 style={{color:'#FFF4A3'}}>Data analytics</h3>
            <ul className='list-unstyled'>
              <li className='_links1'>Numpy</li>
              <li className='_links1'>Pandas</li>
              <li className='_links1'>SciPy</li>
              <li className='_links1'>Excel</li>
              <li className='_links1'>Social Media</li>
            </ul>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12'>
              <h3 style={{color:'#FFF4A3'}}>Programs</h3>
              <ul className='list-unstyled'>
                <li className='_links1'>Full Access</li>
                <li className='_links1'>Front End</li>
                <li className='_links1'>Web Dev.</li>
                <li className='_links1'>Web App</li>
                <li className='_links1'>Web Design</li>
              </ul>
            </div>
        </div>
    </div>
  </div>
  )
}

export default GetCertified
