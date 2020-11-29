import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {Card, CardItem, Body} from 'native-base';
import theme from '../config/style';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Grid, Row} from 'react-native-easy-grid';

/*
 Component to render TicTacToe board
*/
const ConnectionConsole = ({connection}) => {
    const received = useSelector(state => state.conn.received);

    const handle_move = tile => {
        let data = JSON.stringify({
            type: 'message',
            message: JSON.stringify(tile),
            date: Date.now(),
        });

        connection.send(data);
    };

    let board_state = [
        {
            tile_id: 0,
            value: 'X',
        },
        {
            tile_id: 1,
            value: '',
        },
        {
            tile_id: 2,
            value: 'O',
        },
        {
            tile_id: 3,
            value: 'X',
        },
        {
            tile_id: 4,
            value: 'O',
        },
        {
            tile_id: 5,
            value: '',
        },
        {
            tile_id: 6,
            value: 'O',
        },
        {
            tile_id: 7,
            value: 'X',
        },
        {
            tile_id: 8,
            value: '',
        },
    ];

    const render_tiles = () => {
        let cards = [];
        for (let tile of board_state) {
            let color = tile.value === 'X' ? 'crimson' : 'yellowgreen';

            cards.push(
                <Card
                    style={{width: wp(25), height: wp(25), marginRight: wp(1)}}>
                    <CardItem
                        button
                        bordered
                        onPress={() => handle_move(tile)}
                        style={{flex: 1}}>
                        <Body
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: wp(5),
                                    fontWeight: 'bold',
                                    color: color,
                                }}>
                                {tile.value}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>,
            );
        }

        return (
            <Grid
                style={{
                    width: wp(95),
                    paddingLeft: wp(2.5),
                    paddingRight: wp(2.5),
                }}>
                <Row style={{height: wp(25), paddingLeft: wp(7)}}>
                    {cards[0]}
                    {cards[1]}
                    {cards[2]}
                </Row>
                <Row
                    style={{
                        height: wp(25),
                        paddingLeft: wp(7),
                        marginTop: hp(1),
                    }}>
                    {cards[3]}
                    {cards[4]}
                    {cards[5]}
                </Row>
                <Row
                    style={{
                        height: wp(25),
                        paddingLeft: wp(7),
                        marginTop: hp(1),
                    }}>
                    {cards[6]}
                    {cards[7]}
                    {cards[8]}
                </Row>
            </Grid>
        );
    };

    return <View style={{flex: 1, marginTop: 10}}>{render_tiles()}</View>;
};

export default ConnectionConsole;
