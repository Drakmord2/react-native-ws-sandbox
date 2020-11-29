import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Creators} from '../store/ducks/board';
import {Card, CardItem, Body} from 'native-base';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Grid, Row} from 'react-native-easy-grid';

/*
 Component to render TicTacToe board
*/
const TicTacToe = ({connection}) => {
    const [alertcount, setCount] = useState(0);
    const received = useSelector(state => state.conn.received);
    const connected = useSelector(state => state.conn.connected);
    const board_state = useSelector(state => state.board.board);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            if (Array.isArray(received) && board_state !== received) {
                dispatch(Creators.setBoard(received));
                setCount(0);
            }

            if (received.type === 'game' && alertcount === 0) {
                Alert.alert('Game Over', received.message, [
                    {
                        text: 'New Game',
                        onPress: () => dispatch(Creators.clear()),
                    },
                    {
                        text: 'Quit',
                        onPress: () => connection.close(),
                    },
                ]);

                setCount(1);
            }
        } catch (err) {}
    }, [board_state, received]);

    useEffect(() => {
        try {
            if (connected) {
                dispatch(Creators.clear());
            }
        } catch (err) {}
    }, [connected]);

    const handle_move = tile => {
        let data = JSON.stringify({
            type: 'move',
            move: JSON.stringify(tile),
        });

        connection.send(data);
    };

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

export default TicTacToe;
