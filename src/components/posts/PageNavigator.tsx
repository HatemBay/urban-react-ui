import { Button, HStack } from '@chakra-ui/react';
import React from 'react'
import store, { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/reducers/pageSlice';

type Props = {}

const PageNavigator = (props: Props) => {
    const dispatch = useDispatch()

    store.subscribe(() => {
        console.log("slmslm");
        console.log(store.getState())
    })

    // TODO: get total posts
    const pages = 5;
    const pageItems = [];
    for (let i = 0; i < pages; i++) {
        pageItems.push(i);
    }

    const goToPage = (e: any) => dispatch(setPage(1 + (+e.target.value)))

    return (<>
        <HStack>
            {/* TODO: make a request to retrieve number of total posts */}
            {pageItems.map((item) => (
                <Button value={item} onClick={goToPage}>
                    {item + 1}
                </Button>
            ))}
        </HStack></>)
}

export default PageNavigator;