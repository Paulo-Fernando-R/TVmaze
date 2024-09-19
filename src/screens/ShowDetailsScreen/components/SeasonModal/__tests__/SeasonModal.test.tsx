/* eslint-disable prettier/prettier */
import React, {createRef} from 'react';
//import {render, act, fireEvent} from '@testing-library/react-native';
import {render, act, fireEvent} from 'test-utils';
import {SeasonModal} from '../SeasonModal';
import {Modalize} from 'react-native-modalize';

// npx jest --testPathPattern=SeasonModal --coverage
// mock native module react-native-gesture-handler doc: https://docs.swmansion.com/react-native-gesture-handler/docs/guides/testing

describe('SeasonModal', () => {
  test('show all season options', () => {
    const modalizeRef = createRef<Modalize>();
    const {getAllByText} = render(
      <SeasonModal
        onSelectSeason={season => console.log(season)}
        selectedSeason="1"
        seasons={['1', '2', '3']}
        ref={modalizeRef}
      />,
    );

    act(() => {
      modalizeRef.current?.open();
    });

    expect(getAllByText(/Season/i).length).toEqual(3);
  });

  test('onSelectSeason whith correct season when pressed', () => {
    const modalizeRef = createRef<Modalize>();
    const onSelectSeasonMock = jest.fn();

    const {getByText} = render(
      <SeasonModal
        onSelectSeason={onSelectSeasonMock}
        selectedSeason="1"
        seasons={['1', '2', '3']}
        ref={modalizeRef}
      />,
    );

    //precisa colocar o act em lugares onde vai acontecer re-render
    act(() => {
      modalizeRef.current?.open();
    });

    const season2Element = getByText(/season 2/i);
    fireEvent.press(season2Element);

    expect(onSelectSeasonMock).toBeCalledWith('2');
  });
});
