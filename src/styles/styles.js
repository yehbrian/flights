import styled from 'styled-components';


const FlightsList = styled.section`
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    border-bottom: 2px solid black;
`;

const ItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: medium;
`;

const StyledDiv = styled.section`
    padding: 10px;
    min-width: 140px;
`;


const PaginationWrapper = styled.div`
    display: flex;
    flex: 1 100%;
    justify-content: center;
`;

const ItemBody = styled.div`
     display: flex;
`;

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => getColor(props.type)};
    width: ${props => props.width}%;
    padding: 10px 0;
    font-size: small
`;


const Header = styled.header`
    font-size: 1.5rem;
    text-align: center;
    flex: 100%;
`;

const Slider = styled.div`
    display: flex;
    flex-flow: wrap;
    flex-wrap: nowrap;
    word-break: break-all;
    text-align: center;
`;

const getColor = (type) => {
    if (type === "flight") {
        return 'green'
    } else if (type === "turnaround") {
        return 'purple';
    } else if (type=== 'null'){
        return 'grey';
    } else {
        return 'white';
    }

}


export {
    FlightsList,
    StyledDiv,
    ItemHeader,
    ItemBody,
    Header,
    Item,
    Slider,
    PaginationWrapper
}
