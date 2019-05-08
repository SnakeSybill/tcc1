import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { loading as loadingChange } from './../actions/appActions';
import { getUsuario } from './../actions/apiActions';

class Agenda extends Component {

    static navigationOptions = {
        title: 'login',
        header: null
    }

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.getUsuario();
    }

    renderContent() {
        if (this.props.usuario.username === "")
            return (<ActivityIndicator />);
        else {
            return (
                <View style={styles.container}>
                    <Text>Agenda de {this.props.usuario.username}</Text>
                    <View>
                        {
                            this.props.usuario.agenda.map((item, i) => (
                                <Text>{item.idEvento}</Text>
                            ))
                        }
                    </View>
                    <FlatList
                        data={this.props.usuario.agenda}
                        keyExtractor={(item, index) => item.idEvento}
                        renderItem={({ item }) => {
                            <TouchableOpacity >
                                <Text>{item.idEvento}</Text>
                            </TouchableOpacity>
                        }
                        }
                    />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
        usuario: state.apiReducer.usuario,
        loading: state.appReducer.loading,
    }
)

export default connect(mapStateToProps,
    {
        getUsuario,
        loadingChange
    })(Agenda);