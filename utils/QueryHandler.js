"use strict"

class QueryHandler {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filterFind() {
        const queryObj = { ...this.queryString }
        const excludes = ["page", "sort", "limit", "fields"];
        excludes.forEach(field => delete queryObj[field])

        let queryObjStr = JSON.stringify(queryObj)
        queryObjStr = queryObjStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryObjStr));
        return this;
    };

    sortBy() {
        if (this.queryString.sort) {
            const sorted = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sorted)
        }
        else {
            this.query = this.query.sort("-createdAt")
        }
        return this;
    }

    selectFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields)
        }
        else {
            this.query = this.query.select("-__v")
        }
        return this;
    }

    paginate() {
        const page = +this.queryString.page || 1;
        const limit = +this.queryString.limit || 100;
        const skip = (page - 1) * this.limit;

        this.query = this.query.limit(limit).skip(skip)
        return this;
    }
};

module.exports = QueryHandler;