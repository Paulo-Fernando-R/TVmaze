/* eslint-disable prettier/prettier */
import React from 'react';
import {render} from '@testing-library/react-native';
import {StarRating} from '../StarRating';
// npx jest --testPathPattern=StarRating --coverage

describe('StarRating', () => {
  describe('rating was passed', () => {
    test('show the average', average);

    test('show the star icon', starIcon);
  });

  describe('rating was not passed', () => {
    test('return nothing', nothing);
  });
});

function average() {
  const {getByText} = render(<StarRating rating={{average: 7}} />);

  const element = getByText('7');
  expect(element).toBeTruthy();
}

function starIcon() {
  const {getByTestId} = render(<StarRating rating={{average: 7}} />);

  const icon = getByTestId('starIcon');
  expect(icon).toBeTruthy();
}

function nothing() {
  const {container} = render(<StarRating />);

  expect(container.children.length).toEqual(0);
}
