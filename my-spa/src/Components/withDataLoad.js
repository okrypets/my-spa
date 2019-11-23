import React, {PureComponent} from 'react';
import isoFetch from 'isomorphic-fetch';
//import {productsThunkAC} from "../Redux/Thunk/fetchThunkProducts";

import PropTypes from "prop-types";

let withDataLoad = (data) => Component => {

    class ComponentWithDataLoad extends PureComponent {

        componentDidMount() {
          console.log(`componentDidMount - ComponentWithDataLoad`);
          //this.loadData();
          //productsThunkAC(data);
        }
        static propTypes = {
           //products: PropTypes.object, // REDUX
        }

        state = {
          dataReady: false, // готовы ли данные
          combinedProps: null, // исходные пропсы, переданные HOC-у, плюс пропс propName с загруженными данными
        };

        fetchError = (errorMessage) => {
          console.error(showStr);
        };
      
        fetchSuccess = (loadedData) => {
          this.setState({
            dataReady:true,
            combinedProps:{...this.props,[propName]:loadedData},
          });
        };


        loadData = async () => {
      
          try {
            let response=await isoFetch(fetchConfig.URL, fetchConfig);
            if (!response.ok) {
              throw new Error("fetch error " + response.status);
            }
            let data=await response.json();
            this.fetchSuccess(data);
          } 
          catch ( error )  {
            this.fetchError(error.message);
          }
      
        };




      
        render() {
      
         // if ( !this.state.dataReady )
         //   return <div>загрузка данных...</div>;
      
          return <Component {...this.state.combinedProps} /> ;
        }
      
      }

     return ComponentWithDataLoad;


}


export { withDataLoad };
