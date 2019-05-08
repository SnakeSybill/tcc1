import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
//import {  } from './../actions/apiActions';

class AddEvento extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Novo Evento',
        }
    }

    constructor(props) {
        super(props);
    }

    renderContent() {
        return (
            <View style={styles.container}>
                    <Text>Tela a ser implementada até o dia 08/05</Text>
            </View>
        )
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
    }
)

export default connect(mapStateToProps,
    {

    })(AddEvento);