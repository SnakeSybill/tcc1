import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-material-ui';
import { listMeusConvites, respostaConvite, modificaLoading } from './../actions/apiActions';

import Rodape from './../components/rodape.js';

class Convites extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Convites',
            headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.modificaLoading(true);
        this.props.listMeusConvites(this.props.email);
    }

    renderContent() {
        if (this.props.meusConvites.length === 0) {
            return (
                this.props.loadingAPI ?
                    <View style={styles.container}>
                        <ActivityIndicator size="large" />
                    </View> :
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                            <Text style={{ fontSize: 18, paddingHorizontal: 20 }}>Você não possui convites</Text>
                        </View>
                        <Rodape pagina="convites" navigation={this.props.navigation} />
                    </View>
            )
        }
        else {
            return (
                this.props.loadingAPI ?
                    <View style={styles.container}>
                        <ActivityIndicator size="large" />
                    </View> :
                    <View style={styles.container}>
                        <View style={{ flex: 1, alignContent: "center", paddingVertical: 15 }}>
                            <Text style={{ fontSize: 18, paddingHorizontal: 20, color: "#000" }}>Convites para {this.props.usuario.username}</Text>
                        </View>
                        <View style={{
                            flex: 8, justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                        }}>
                            {
                                this.props.meusConvites.map((item, i) => (
                                    <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("viewconvite", { item })} style={{ flex: 1, height: 50, borderColor: '#d6d7da', alignContent: "flex-start" }}>
                                        <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>{item.nomeEvento}</Text>
                                        <Divider />
                                    </TouchableOpacity>
                                </View>
                                    
                                ))
                            }
                        </View>
                        <Rodape pagina="convites" navigation={this.props.navigation} />
                    </View>
            )
        }
    }

    render() {
        return (this.renderContent());
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapStateToProps = state => (
    {
        meusConvites: state.apiReducer.meusConvites,
        email: state.appReducer.email,
        usuario: state.apiReducer.usuario,
        loadingAPI: state.apiReducer.loadingAPI,
    }
)

export default connect(mapStateToProps,
    {
        listMeusConvites, respostaConvite, modificaLoading
    })(Convites);