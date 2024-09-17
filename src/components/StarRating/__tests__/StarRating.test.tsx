/* eslint-disable prettier/prettier */
import React from 'react';
import {render} from '@testing-library/react-native';
import {StarRating} from '../StarRating';

describe('StarRating', () => {
  test('StarRating rendered', () => {
    render(<StarRating rating={{average: 7}} />);
  });
});
