import React from 'react';
import Comment from '../../components/Comment';

import { shallow, mount, render } from 'enzyme'

describe('<Comment />', () => {
    const comment = {
        comment: 'Teste'
    }
    it('renders without crashing', () => {
        const wrapper = shallow(<Comment comment={comment} />)
        expect(wrapper.length).toBe(1)
        expect(wrapper.is('.card')).toBe(true)
        expect(wrapper.text()).toBe(comment.comment)
    }) 
})

