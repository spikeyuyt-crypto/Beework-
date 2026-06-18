import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emptyForm = {
    kname: "",
    mail: "",
    tel: "",
};

const getFirstValue = (source, keys, fallback = "") => {
    for (const key of keys) {
        const value = source?.[key];
        if (value !== undefined && value !== null && value !== "") {
            return value;
        }
    }

    return fallback;
};

const getAdminId = (admin, index) =>
    getFirstValue(admin, ["userCD", "userCd", "userCode", "userId", "id", "adminId"], `row-${index}`);

const getAdminName = (admin) => {
    const fullName = getFirstValue(admin, ["userName", "name", "adminName"]);
    if (fullName) return fullName;

    const firstName = getFirstValue(admin, ["firstName", "givenName"]);
    const lastName = getFirstValue(admin, ["lastName", "familyName"]);
    return `${lastName}${firstName}`;
};

const getAdminRows = (data) => {
    if (Array.isArray(data?.data?.a0301Vo)) return data.data.a0301Vo;
    if (Array.isArray(data?.data?.list)) return data.data.list;
    if (Array.isArray(data?.data?.records)) return data.data.records;
    if (Array.isArray(data?.a0301Vo)) return data.a0301Vo;
    if (Array.isArray(data?.list)) return data.list;
    if (Array.isArray(data)) return data;
    return [];
};

const formatSex = (value) => {
    if (value === "male" || value === "1" || value === 1) return "男性";
    if (value === "female" || value === "2" || value === 2) return "女性";
    return value || "";
};

const formatStatus = (value) => {
    if (value === "0" || value === 0 || value === false) return "有効";
    if (value === "1" || value === 1 || value === true) return "ロック";
    return value || "";
};

const formatAuthority = (value) => {
    if (value === "0" || value === 0) return "管理者";
    if (value === "1" || value === 1) return "一般";
    return value || "";
};

export default function A0301() {
    // 状态定义
    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [searchForm, setSearchForm] = useState(emptyForm);
    const [checkedList, setCheckedList] = useState([]);
    const [inputPage, setInputPage] = useState("");

    // 计算分页
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = useMemo(
        () => allData.slice(startIndex, endIndex),
        [allData, startIndex, endIndex],
    );


    const navigate = useNavigate();

    const authority = "管理者";

    // 当前页是否全选
    const isAllCurrentPageChecked =
        currentPageData.length > 0 &&
        currentPageData.every((admin, index) => checkedList.includes(getAdminId(admin, startIndex + index)));

    // 更新页码列表
    const getPageNumbers = () => {
        const list = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i += 1) {
                list.push(i);
            }
        } else if (currentPage <= 4) {
            list.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage >= totalPages - 3) {
            list.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            list.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }
        return list;
    };

    // 更新搜索结果并重置相关状态
    const applySearchResult = useCallback((res) => {
        const list = getAdminRows(res.data);
        setAllData(list);
        setTotal(Number(res.data?.data?.total ?? res.data?.total ?? list.length));
        setCurrentPage(1);
        setCheckedList([]);

        if (list.length === 0) {
            alert("見つかりませんでした。");
        }
    }, []);

    // 搜索数据（可选覆盖表单）
    const searchData = useCallback(async (overrideForm = null) => {
        try {
            const currentForm = overrideForm || searchForm;
            const res = await axios.post("http://localhost:8080/adminList/search", {
                authority: "0",
                userName: currentForm.kname,
                userMail: currentForm.mail,
                userTel: currentForm.tel,
            });
            console.log("backend response:", res.data);
            applySearchResult(res);
        } catch (e) {
            console.log("request failed:", e);
        }
    }, [applySearchResult, searchForm]);

    // 更新搜索表单状态
    const handleSearchFormChange = (e) => {
        const { name, value } = e.target;
        setSearchForm((prev) => ({ ...prev, [name]: value }));
    };

    // 点击清除按钮
    const handleClear = () => {
        setSearchForm(emptyForm);
        searchData(emptyForm);
    };

    // 点击全选按钮
    const handleOriginCheckboxClick = () => {
        setCheckedList(
            isAllCurrentPageChecked
                ? []
                : currentPageData.map((admin, index) => getAdminId(admin, startIndex + index)),
        );
    };

    // 点击复选框更新选中列表
    const handleCheckboxClick = (adminId) => {
        setCheckedList((prev) =>
            prev.includes(adminId) ? prev.filter((id) => id !== adminId) : [...prev, adminId],
        );
    };

    // 点击页码跳转
    const handlePageButtonClick = (page) => {
        if (page === "..." || totalPages === 0) return;
        if (page === "<") {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
        } else if (page === ">") {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        } else {
            setCurrentPage(Number(page));
        }
    };

    // 输入页码跳转
    const handleJump = () => {
        const targetPage = Number(inputPage);
        if (!targetPage || targetPage < 1 || targetPage > totalPages) {
            alert(`1から${totalPages}の間で有効なページ番号を入力してください。`);
            return;
        }
        setCurrentPage(targetPage);
        setInputPage("");
    };

    // 初始加载时获取数据
    useEffect(() => {
        let isMounted = true;
        axios
            .post("http://localhost:8080/adminList/search", {
                authority: "0",
                userName: emptyForm.kname,
                userMail: emptyForm.mail,
                userTel: emptyForm.tel,
            })
            .then((res) => {
                if (isMounted) {
                    console.log("backend response:", res.data);
                    applySearchResult(res);
                }
            })
            .catch((e) => {
                console.log("request failed:", e);
            });
        return () => {
            isMounted = false;
        };
    }, [applySearchResult]);

    // 全局回车事件监听，触发搜索
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                searchData();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [searchData]);

    //#region 删除逻辑整体
    const handleDelete = (userIDList) => {
        axios
            .put("http://localhost:8080/adminList/userDelete", {
                userIDList: userIDList,
            })
            .then((res) => {
                console.log("backend response:", res.data);

                alert(`${res.data.data}件削除しました。`);
                searchData();
            })
            .catch((e) => {
                console.log("request failed:", e);
            });

    };

    const handleMultiDelete = () => {
        handleDelete(checkedList);
    }


    const handleSingleDelete = (userId) => {
        handleDelete([userId]);
    }
//#endregion

//# region 返回页面元素
    return (
        <div className="a0301">
            <div className="page-title">
                <h1>Beework</h1>
                <hr />
            </div>

            <div>
                <h3>管理者一覧</h3>

                <div className="inputTxT">
                    <span className="textInput">
                        <label htmlFor="uName">氏名</label>
                        <input
                            type="text"
                            id="uName"
                            name="kname"
                            value={searchForm.kname}
                            onChange={handleSearchFormChange}
                        />
                    </span>

                    <span className="textInput">
                        <label htmlFor="uEmail">メール</label>
                        <input
                            type="text"
                            id="uEmail"
                            name="mail"
                            value={searchForm.mail}
                            onChange={handleSearchFormChange}
                        />
                    </span>

                    <span className="textInput">
                        <label htmlFor="uPhone">電話番号</label>
                        <input
                            type="text"
                            id="uPhone"
                            name="tel"
                            value={searchForm.tel}
                            onChange={handleSearchFormChange}
                        />
                    </span>
                </div>

                <div className="buttonGroup">
                    <button id="clearButton" onClick={handleClear}>
                        クリア
                    </button>
                    <button id="searchButton" onClick={() => searchData()}>
                        検索
                    </button>
                </div>
            </div>

            <div className="dataDiv">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        id="originCheckbox"
                                        checked={isAllCurrentPageChecked}
                                        onChange={handleOriginCheckboxClick}
                                    />
                                </th>
                                <th>管理者名</th>
                                <th>性別</th>
                                <th>状態</th>
                                <th>電話番号</th>
                                <th>メール</th>
                                <th>権限</th>
                                <th>最終ログイン日時</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((admin, index) => {
                                const adminId = getAdminId(admin, startIndex + index);

                                return (
                                    <tr key={adminId}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={checkedList.includes(adminId)}
                                                onChange={() => handleCheckboxClick(adminId)}
                                            />
                                        </td>
                                        <td>{getAdminName(admin)}</td>
                                        <td>{formatSex(getFirstValue(admin, ["sex", "gender"]))}</td>
                                        <td>{formatStatus(getFirstValue(admin, ["userStatus", "status", "lockFlag"]))}</td>
                                        <td>{getFirstValue(admin, ["userTel", "tel", "phone", "phoneNumber"])}</td>
                                        <td>{getFirstValue(admin, ["userMail", "mail", "email"])}</td>
                                        <td>{formatAuthority(getFirstValue(admin, ["authority", "role", "permission"]))}</td>
                                        <td>{getFirstValue(admin, ["updateTime", "lastLoginTime", "lastLoginAt"])}</td>
                                        <td>
                                            <button
                                                className="buttonType0"
                                                id="updateButton"
                                                onClick={() => {
                                                    navigate(`/A0303/${adminId}`, { state: { authority: authority, adminId: adminId } });
                                                }}
                                            >
                                                情報修正
                                            </button>
                                            <button className="buttonType0" id="lockButton">
                                                ロック
                                            </button>
                                            <button className="buttonType0" id="deleteButton" onClick={() => handleSingleDelete(adminId)}>
                                                削除
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div id="div3">
                    <button
                        className="buttonType0"
                        onClick={() => {
                            window.location.href = "/A0004";
                        }}
                    >
                        新規
                    </button>
                    <button className="buttonType0">ロック</button>
                    <button className="buttonType0">アンロック</button>
                    <button className="buttonType0"
                        onClick={handleMultiDelete}
                    >削除</button>
                </div>

                <div className="bottomBar">
                    <span>
                        総計<span id="totalItems">{total}</span>件
                    </span>

                    <select
                        name="numOnPage"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value="5">5件/ページ</option>
                        <option value="10">10件/ページ</option>
                        <option value="20">20件/ページ</option>
                    </select>

                    <div id="pageButtonsArea">
                        <button
                            className="buttonType0"
                            disabled={currentPage <= 1}
                            onClick={() => handlePageButtonClick("<")}
                        >
                            {"<"}
                        </button>

                        {getPageNumbers().map((page, index) => {
                            const isEllipsis = page === "...";
                            const isActive = page === currentPage;
                            let className = "buttonType0";
                            if (isActive) className += " activePage";
                            if (isEllipsis) className += " buttonType2";

                            return (
                                <button
                                    key={isEllipsis ? `ellipsis-${index}` : page}
                                    className={className}
                                    disabled={isEllipsis}
                                    onClick={() => handlePageButtonClick(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            className="buttonType0"
                            disabled={totalPages === 0 || currentPage >= totalPages}
                            onClick={() => handlePageButtonClick(">")}
                        >
                            {">"}
                        </button>
                    </div>

                    <span className="textInput" id="jumpToPageInput">
                        <input
                            type="text"
                            placeholder="ページ"
                            value={inputPage}
                            onChange={(e) => setInputPage(e.target.value)}
                        />
                    </span>

                    <button className="buttonType0" id="jumpToPage" onClick={handleJump}>
                        ページへ
                    </button>
                </div>
            </div>
        </div>
    );
}
//#endregion