import React from 'react';
import {View, Text} from 'react-native';
import theme from '../config/style';

const Title = ({text}) => {
    return (
        <View style={{marginTop: 25, marginBottom: 10}}>
            <Text
                style={{
                    color: theme.dark.text,
                    fontWeight: 'bold',
                    fontSize: 35,
                    marginLeft: 10,
                }}>
                {text}
            </Text>
        </View>
    );
};

export default Title;
