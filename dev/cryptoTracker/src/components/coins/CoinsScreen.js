import React from 'react'
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator} from 'react-native'

import Http from '../../libs/http'

import CoinsSearch from './CoinsSearch'
import CoinsItem from './CoinsItem'

import Colors from './../../res/colors'

class CoinsScreen extends React.Component
{
    state = {
        coins: [],
        allCoins: [],
        loading: false
    }

    componentDidMount = async () => {

       this.getCoins()
    }

    getCoins = async () => {
        this.setState({loading: true})

        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/")

        this.setState({coins: res.data, allCoins: res.data, loading: false})
    }

    handlePress = (coin) =>{
        console.log("go to detail", this.props)

        this.props.navigation.navigate('CoinsDetail',{coin});
    }

    handleSearch = (query) => {
        const {allCoins} = this.state

        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase())
        })

        this.setState({coins: coinsFiltered})
    }

    render()
    {
        const { coins, loading } = this.state
         
        return (
            <View style={styles.container}>
                {
                    loading ? <ActivityIndicator color="#fff" size="large" style={styles.loading}></ActivityIndicator>
                    : null
                }
                <CoinsSearch onChange={this.handleSearch}></CoinsSearch>
                <FlatList 
                    data={coins}
                    renderItem={({item}) => 
                        <CoinsItem onPress={() => this.handlePress(item)} item={item}></CoinsItem>
                    }>
                    
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    title: {
        color: "#fff",
        textAlign: "center"
    },  
    btn: {
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: "#fff",
        textAlign: "center"
    },
    loading:{
        marginTop: 60
    }
})
export default CoinsScreen