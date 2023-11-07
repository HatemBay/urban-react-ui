import { Button, HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { decremented, incremented, setPage } from '../../redux/reducers/pageSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from '../../data/constants';

type Props = {}

const PageNavigator = (props: Props) => {
    const { currPage } = useSelector((state: RootState) => state.page);

    const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);

    const dispatch = useDispatch();

    // TODO: get total posts
    const pages = 14;

    const pageItems = [];
    for (let i = 0; i < pages; i++) {
        pageItems.push(i);
    }

    const goToPage = (e: any) => dispatch(setPage(1 + (+e.target.value)));

    return (<>
        <HStack>
            {/* TODO: make a request to retrieve number of total posts */}
            <Button _hover={{ background: "blue", color: "white" }} {...(currPage === 1 ? ({ isDisabled: true }) : {})} onClick={() => dispatch(decremented())}>
                <ChevronLeftIcon></ChevronLeftIcon>
            </Button>
            {pageItems.map((item, iterator) => {
                const i = iterator + 1
                if (pages > 5) {
                    if ((currPage > 3) && (((pages - currPage > 1) && ((currPage - i > 2) || (i - currPage > 2))) || ((pages - currPage === 1) && (currPage - i > 3)) || ((pages === currPage) && (currPage - i > 4)))) {
                        return
                    } else if ((currPage < 4) && (i > 5)) {
                        return
                    }
                } else if (pages < 6) {
                    if (i > 5) {
                        return
                    }
                }

                return (
                    <Button {...(currPage === (i) && ({ isActive: true }))} _hover={{ background: "blue", color: "white" }}
                        _active={{ background: "blue", color: "white" }} value={item} onClick={goToPage}>
                        {item + 1}
                    </Button>
                )
            }
            )}
            <Button _hover={{ background: "blue", color: "white" }} {...(currPage === pages && { isDisabled: true })} onClick={() => dispatch(incremented())}> <ChevronRightIcon></ChevronRightIcon></Button>

        </HStack >
    </>)
}

export default PageNavigator;