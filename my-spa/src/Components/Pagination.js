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
        const {
            totalRecords = null,
            pageNeighbours = 0
        } = props;
        this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

        this.pageNeighbours =
            typeof pageNeighbours === "number"
                ? Math.max(0, Math.min(pageNeighbours, 2))
                : 0;
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
        pageLimit:50,
        totalPages:Math.ceil(this.props.totalRecords / 50),
    };

    UNSAFE_componentWillMount() {
        appEvents.addListener('EcurrentPageToHandleClick',this.handleClick);
    }

    //componentWillReceiveProps(nextProps, nextContext) {
    componentDidUpdate(prevProps, prevState, Snapshot) {
        const locationCurrentPage = +this.props.location.pathname.replace(/[^0-9]/g, "");

            this.setState({
                currentPage: locationCurrentPage === 0 || locationCurrentPage > this.totalPages ? 1 : locationCurrentPage,
                totalPages: Math.ceil(this.props.totalRecords / this.state.pageLimit),
            });

    }

    componentDidMount() {
        this.gotoPage(this.state.currentPage);
    }
    componentWillUnmount() {
        appEvents.removeListener('EcurrentPageToHandleClick',this.handleClick);
    }


    gotoPage = (page) => {
        const { onPageChanged = f => f} = this.props;
        const currentPage = Math.max(0, Math.min(page, this.state.totalPages));
        const {pageLimit,  totalPages} = this.state;
        const paginationData = {
            currentPage,
            totalPages: totalPages,
            pageLimit: pageLimit ,
            totalRecords: this.totalRecords
        };
        this.setState({ currentPage }, () => onPageChanged(paginationData));
        //console.log(paginationData)
    };

    pageLimitChange10 = () => {
        console.log(`pageLimitChange10`);
        const totalPages = Math.ceil(this.totalRecords / 10);
        this.setState({
            pageLimit:10,
            totalPages: totalPages,
        }, () => this.gotoPage(this.state.currentPage))


    }

    pageLimitChange50 = () => {
        console.log(`pageLimitChange50`);
        const totalPages = Math.ceil(this.totalRecords / 50);
        this.setState({
            pageLimit:50,
            totalPages: totalPages,
        }, () => this.gotoPage(this.state.currentPage));

    }

    handleClick = (page) => {
        this.gotoPage(page);
    };

    handleMoveLeft = () => {
        this.gotoPage(this.state.currentPage - 1);
    };

    handleMoveRight = () => {
        this.gotoPage(this.state.currentPage + 1);
    };

    fetchPageNumbers = () => {
        const totalPages = this.state.totalPages;
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
        console.log(`Pagination - RENDER`);
        if (!this.totalRecords) return null;

        if (this.totalPages === 1) return null;

        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();
        const { location } = this.props;

        return (
            <Fragment>
                <div className={`PageLimitButtons`}>
                    Show:
                    <button value={10} children={10} onClick={this.pageLimitChange10} className={this.state.pageLimit === 10 ? 'active': ''}/>
                    <button value={50} children={50} onClick={this.pageLimitChange50} className={this.state.pageLimit === 50 ? 'active': ''}/>
                </div>
                <nav aria-label="paginationBlock">
                    <ul className="pagination">
                        {pages.map((page, index) => {

                            if (page === LEFT_PAGE)
                                return (
                                    <li key={index} className="page-item">
                                        <Link to={`/catalog/page-${this.state.currentPage - 1}`}
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
                                            className="page-link"
                                            onClick={e => this.handleClick(page, e)}
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

export default withRouter(Pagination);
