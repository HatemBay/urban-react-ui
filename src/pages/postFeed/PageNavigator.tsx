import { Button, HStack } from '@chakra-ui/react';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { decremented, incremented, setPage } from '../../redux/reducers/pageSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from '../../data/constants';

type Props = {
    totalCount: number;
    take: number;
}

const PageNavigator = ({ totalCount, take }: Props) => {
    const { currPage } = useSelector((state: RootState) => state.page);

    const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
    const ButtonPrimary = useLightDark(SHARED_COLORS.ButtonPrimary);

    const dispatch = useDispatch();

    // TODO: get total posts
    const pages = Math.ceil(totalCount / take);

    const pageItems = [];
    for (let i = 0; i < pages; i++) {
        pageItems.push(i);
    }

    const goToPage = (e: any) => dispatch(setPage(1 + (+e.target.value)));

    return (<>
        <HStack>
            {/* TODO: make a request to retrieve number of total posts */}
            <Button _hover={{ background: { ButtonPrimary }, color: "white" }} {...(currPage === 1 ? ({ isDisabled: true }) : {})} onClick={() => dispatch(decremented())}>
                <ChevronLeftIcon></ChevronLeftIcon>
            </Button>
            {/* //***************************
            //TODO: ADD KEY
            //*************************** */}
            {pageItems.map((item, iterator) => {
                const i = iterator + 1
                // TODO: reduce if that's what needs to be done
                if (pages > 5) {
                    if ((currPage > 3) && (((pages - currPage > 1) && ((currPage - i > 2) || (i - currPage > 2))) || ((pages - currPage === 1) && (currPage - i > 3)) || ((pages === currPage) && (currPage - i > 4)))) {
                        return
                    } else if ((currPage < 4) && (i > 5)) {
                        return
                    }
                } else
                    if (i > 5) {
                        return
                    }
                // } else if (pages < 6) {
                //     if (i > 5) {
                //         return
                //     }
                // }
                return (
                    <Button {...(currPage === (i) && ({ isActive: true }))} _hover={{ background: "#758BFD", color: "white" }}
                        _active={{ background: "#758BFD", color: "white" }} value={item} onClick={goToPage}>
                        {item + 1}
                    </Button>
                )
            }
            )}
            <Button _hover={{ background: "#758BFD", color: "white" }} {...(((currPage === pages) || (pages === 0)) && { isDisabled: true })} onClick={() => dispatch(incremented())}> <ChevronRightIcon></ChevronRightIcon></Button>
        </HStack >
    </>)
}

export default PageNavigator;