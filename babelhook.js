// The only purpose of this file is to ensure
// the babel transpiler is activated prior to any
// test code, and using the same babel options

require("babel/register")({
    sourceMap: 'inline'
});
