import React, {Component, lazy, Suspense} from 'react';
import Axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"


class KrazyBee extends Component{
	constructor(props){
		super(props);
		this.state={
			allUsersDetails:{}
		}
	}
	albumsall =async (value) =>{
		let response  =  await	Axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${value.userId}`)
			return await response.data;
	}
	async userList (){
		let albumresponse = {};
		let result  = await Axios.get('https://jsonplaceholder.typicode.com/albums')
			let data = await result.data
			
			for(let i=0;i<data.length;i++) {
				let response = await this.albumsall(data[i])
				albumresponse[i] = {user: data[i], response:{response}};
			}
			var allUsers = [];
			for(var key in albumresponse) {
				allUsers.push(albumresponse[key]);
			}
			this.setState({allUsersDetails : allUsers})
	}
	
	responsive = {
		0: { items: 1 },
		1: { items: 2 },
		2: { items: 3 },
		3: { items: 4 },
		4: { items: 5 },
	  }
	
	render(){
		 let { allUsersDetails} = this.state;	
		 let UserDetail= null
		 if(Object.keys(allUsersDetails).length > 0){
			UserDetail  = allUsersDetails.map((element, ind) =>{
				 let columnValues = element.response.response.map(columnValue => {
					 return <div >
						 <div><img src ={columnValue.thumbnailUrl} /></div>
						 <div>{columnValue.title}</div>
						 <div>id: {columnValue.id}</div>
					 </div>
				 })
				return  <Suspense fallback={<h1>Still Loading…</h1>}>  
							<div style ={{border : "1px solid grey", borderBottom: "none"}} >
								<div>{element.user.title}</div>
								<div>id:{element.user.id} , userId:{element.user.userId}</div>
								<AliceCarousel mouseDragEnabled 
								autoPlayInterval={2000}
								buttonsDisabled={true}
								items ={columnValues}
								responsive ={this.responsive}
								/>
							</div>
						</Suspense>
			})
		 }
		return (
			<div>
				<button type ="button" onClick ={this.userList.bind(this)}>Submit</button>
					{UserDetail}
		</div>)
	}
}
export default KrazyBee