exports.formatDates = (list) => {
    if (list.length === 0) return [];

    else {





        return list.map(obj => {
            let newObj = { ...obj }
            newObj.created_at = new Date(newObj.created_at)

            // const newArr = [newObj]

            return newObj
        })




    }
};

exports.makeRefObj = (inputArr, refKey, refValue) => {
    return inputArr.reduce((obj, { [refKey]: value, [refValue]: id }) => {
        return Object.assign(obj, { [value]: id });
    }, {});
};

exports.formatComments = (comments, articleRef) => {
    if (comments.length === 0)
        return {}
    else {
        return comments.map((curObj) => {
            const { belongs_to, created_by, created_at, ...rest } = curObj;
            return {
                created_at: new Date(created_at),
                author: created_by,
                article_id: articleRef[belongs_to], ...rest
            };
        })
    }
}

