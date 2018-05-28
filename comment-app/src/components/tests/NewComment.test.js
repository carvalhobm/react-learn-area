import React from 'react';

import { shallow, mount, render } from 'enzyme'
import NewComment from '../../components/NewComment';

describe('<NewComment />', () => {
    const postNewCommentMock = jest.fn()
    it('renders withou crashing', () => {
        const wrapper = shallow(<NewComment postNewComment={postNewCommentMock} />)
        expect(wrapper.length).toBe(1)
    }) 
    
    it('handles button diff from enter', () => {
        const wrapper = mount(<NewComment postNewComment={postNewCommentMock} />)
        const eventMock = {
            preventDefault: jest.fn(),
            keyCode: 14
        }
        wrapper.instance().handleEnter(eventMock)
        
        expect(eventMock.preventDefault.mock.calls.length).toBe(0)
        expect(postNewCommentMock.mock.calls.length).toBe(0)
    }) 
    
    it('handles enter', () => {
        const wrapper = mount(<NewComment postNewComment={postNewCommentMock} />)
        const eventMock = {
            preventDefault: jest.fn(),
            keyCode: 13
        }
        wrapper.instance().refs.comment.value = 'Test'
        wrapper.instance().handleEnter(eventMock)
        
        expect(eventMock.preventDefault.mock.calls.length).toBe(1)
        expect(postNewCommentMock.mock.calls.length).toBe(1)
        expect(postNewCommentMock.mock.calls[0][0].comment).toBe('Test')
        expect(wrapper.instance().refs.comment.value).toBe('')
    }) 
})

