import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import './Pagination.scss';
import {appEvents} from "./events";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";


const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};


class Pagination extends PureComponent {
    constructor(props) {
        super(props);
        const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;
        this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
        this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

        this.pageNeighbours =
            typeof pageNeighbours === "number"
                ? Math.max(0, Math.min(pageNeighbours, 2))
                : 0;

        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
    }

    static propTypes = {
        totalRecords: PropTypes.number.isRequired,
        pageLimit: PropTypes.number,
        pageNeighbours: PropTypes.number,
        onPageChanged: PropTypes.func,
        currentPage: PropTypes.number.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        currentPage: this.props.currentPage,
    };

    componentWillMount() {
        console.log(`componentWillMount - Pagination`);
        appEvents.addListener('EcurrentPageToHandleClick',this.handleClick);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`componentWillReceiveProps - Pagination`);
        console.log(nextProps.match.params.urlParams);
        console.log(nextProps.currentPage);
        console.log(this.props.currentPage);
        console.log(nextProps.location.pathname.replace(/[^0-9]/g, ""));
        console.log(this.totalPages);
        const locationCurrentPage = +nextProps.location.pathname.replace(/[^0-9]/g, "");

            this.setState({
                currentPage: locationCurrentPage === 0 || locationCurrentPage > this.totalPages ? 1 : locationCurrentPage,
            });

    }

    componentDidMount() {
        console.log(`componentDidMount - Pagination`);
        //this.gotoPage(1);
        //console.log(this.state.currentPage);
        this.gotoPage(this.state.currentPage);
    }
    componentWillUnmount() {
        console.log(`componentWillUnmount - Pagination`);
        appEvents.removeListener('EcurrentPageToHandleClick',this.handleClick);
    }


    gotoPage = (page) => {
        let nextPropsPageNumber = this.state.currentPage;
        console.log(`gotoCurrentPage - run`);
        console.log(page);

        if(nextPropsPageNumber !== page) {
            console.log(`${nextPropsPageNumber}, ${page}`)
        }


        const { onPageChanged = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPage,
            totalPages: this.totalPages,
            pageLimit: this.pageLimit,
            totalRecords: this.totalRecords
        };
        //this.props.dispatch(paginationStateAC(currentPage));

        this.setState({ currentPage }, () => onPageChanged(paginationData));
        //return currentPage;
    };


    handleClick = (page) => {
        //evt.preventDefault();
        this.gotoPage(page);
    };

    handleMoveLeft = () => {
        //evt.preventDefault();
        //this.setState();
        //this.gotoPage(this.props.pagination.currentPage - this.pageNeighbours * 2 - 1);
        this.gotoPage(this.state.currentPage - 1);
    };

    handleMoveRight = () => {
        //evt.preventDefault();
        this.gotoPage(this.state.currentPage + 1);
    };

    fetchPageNumbers = () => {
        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;

        const totalNumbers = this.pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            let pages = [];

            const leftBound = currentPage - pageNeighbours;
            const rightBound = currentPage + pageNeighbours;
            const beforeLastPage = totalPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

            pages = range(startPage, endPage);

            const pagesCount = pages.length;
            const singleSpillOffset = totalNumbers - pagesCount - 1;

            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;

            const leftSpillPage = LEFT_PAGE;
            const rightSpillPage = RIGHT_PAGE;

            if (leftSpill && !rightSpill) {
                const extraPages = range(startPage - singleSpillOffset, startPage - 1);
                pages = [leftSpillPage, ...extraPages, ...pages];
            } else if (!leftSpill && rightSpill) {
                const extraPages = range(endPage + 1, endPage + singleSpillOffset);
                pages = [...pages, ...extraPages, rightSpillPage];
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage];
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    render() {
        console.log(`Pagination - render`);
        if (!this.totalRecords) return null;

        if (this.totalPages === 1) return null;

        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();
        const { location } = this.props;
        //console.log(location.search);

        return (
            <Fragment>
                <nav aria-label="paginationBlock">
                    <ul className="pagination">
                        {pages.map((page, index) => {

                            if (page === LEFT_PAGE)
                                return (
                                    <li key={index} className="page-item">
                                        <Link to={`/catalog/page-${this.state.currentPage - 1}`}
                                            //to={location => ({ ...location, pathname: `/catalog/page-${this.state.currentPage - 1}` })}
                                            className="page-link"
                                            aria-label="Previous"
                                            onClick={this.handleMoveLeft}
                                        >
                                            <span aria-hidden="true">&laquo;</span>
                                        </Link>
                                    </li>
                                );

                            if (page === RIGHT_PAGE)
                                return (
                                    <li key={index} className="page-item">
                                        <Link to ={`/catalog/page-${this.state.currentPage  + 1}`}
                                            //to={location => ({ ...location, pathname: `/catalog/page-${this.state.currentPage + 1}` })}
                                            className="page-link"
                                            aria-label="Next"
                                            onClick={this.handleMoveRight}
                                        >
                                            <span aria-hidden="true">&raquo;</span>
                                        </Link>
                                    </li>
                                );


                            return (
                                <li
                                    key={index}
                                    className={`page-item${
                                        currentPage === page ? " active" : ""
                                    }`}
                                >
                                    <Link  to ={`/catalog/page-${page + location.search}`}
                                            //to ={location => ({ ...location, pathname: `/catalog/page-${page}` })}
                                            //pathname = {`/catalog/page-${page}`}
                                            className="page-link"
                                            onClick={e => this.handleClick(page, e)}
                                            //replace
                                    >
                                        {page}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Fragment>
        );
    }
}
/*
Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func
};

 */
/*
const mapStateToProps = function (state) {
    return {
        //pagination: state.pagination.pagination,
    };
};



export default connect(mapStateToProps)(Pagination);

 */


export default withRouter(Pagination);