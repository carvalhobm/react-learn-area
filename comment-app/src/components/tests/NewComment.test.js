import React from 'react';
import NewComment from '../../components/NewComment';

import { shallow, mount, render } from 'enzyme'

describe('<NewComment />', () => {
    const postNewCommentMock = jest.fn()
    it('renders withou crashing', () => {
        const wrapper = shallow(<NewComment postNewComment={postNewCommentMock} />)
        expect(wrapper.length).toBe(1)
    }) 
})

