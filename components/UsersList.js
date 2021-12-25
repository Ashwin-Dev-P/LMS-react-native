import React, { Component } from 'react'
import { FlatList, View , Text} from 'react-native'
import axios from 'axios'
import Loading from './Loading'

export default class UsersList extends Component {

    constructor(props){
        super(props)
        this.state = {
            users: [],
            loading: true,
            error: false,
        }
    }
    componentDidMount(){
        this.setState({
            loading: true
        })
        const headers = {
            'Content-Type': 'application/json',
            
        }
        
        //const url = domain_url + "/api/member/basic/from/"+ ( (this.state.page * this.state.itemsPerPage) -9 ) +"/count/"+ this.state.itemsPerPage ;
        const url = "https://lib-management-sys.herokuapp.com/api/user";
        axios
        .get(url,headers)
        .then(res => {
            
            if(res.status === 200 && res.data.status === 200){
                this.setState({
                    users: res.data.data
                })

            }
            
            this.setState({ loading: false });

            
        })
        .catch(error=>{
           
            console.log(error);
            this.setState({ loading: false, error: true });
        }
        );
    }
    render() {

        return (
            <View>
                {this.state.loading === false ? 
                <>
                    {this.state.error === true ? 
                        <>
                            Something went wrong
                        </> 
                        :
                        <>
                            <FlatList data={this.state.users} renderItem={({item})=>
                                <Text key={item._id}>{item.email}</Text>
                            }  
                            />
                        </>
                    }
                    




                </> 
                : 
                <Loading></Loading>
                }
                
            </View>
        )
    }
}
