import React from 'react';
import FavoriteCount from "./FavoriteCount";

const mockGetFavoriteCount = jest.fn();
jest.mock('./FavoriteCount', () => {
    return jest.fn().mockImplementation(() => {
        return {getFavoriteCount: mockGetFavoriteCount};
    });
});
