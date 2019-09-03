
        var TokenType = {
            Empty: { name: "Empty" },
            Number: { name: "Number", expectAfter: [ "Empty", "Operator" ] },
            Operator: { name: "Operator", expectAfter: [ "Number", "Expression" ] },
            Expression: { name: "Expression", expectAfter: [ "Empty", "Operator" ] }
        };

        var Operator = [
            { operator: "^", priority: 3, eval: function(a,b) { return Math.pow(a,b); } },
            { operator: "*", priority: 2, eval: function(a,b) { return a*b; } },
            { operator: "/", priority: 2, eval: function(a,b) { return a/b; } },
            { operator: "+", priority: 1, eval: function(a,b) { return a+b; } },
            { operator: "-", priority: 1, eval: function(a,b) { return a-b; } }
        ];

        function Evaluator()
        {
        }

        Evaluator.prototype = {
            eval: function(str) {
                var tokens = [];
                while(str !== "") {
                    var token = this.extractNumber(str, tokens.length === 0);
                    if (token === null) {
                        token = this.extractOperator(str);
                    }
                    if (token === null) {
                        token = this.extractExpression(str);
                    }
                    if (token === null) {
                        throw Error('Token unexpected '+str);
                    }
                    this.assert(tokens[tokens.length - 1], token);
                    tokens.push(token);
                    str = str.substr(token.rawValue.length);
                }
                if (tokens.length === 0) return null;
                if (tokens[tokens.length - 1].type === TokenType.Operator) {
                    throw new Error('Invalid formula');
                }
                return this.processTokens(tokens);
            },

            processTokens: function(tokens) {
                var processTokens = [];
                while (tokens.length > 1) {
                    var maxPriority = tokens.filter(function(t) {
                        return t.type === TokenType.Operator;
                    }).map(function(t) {
                        return t.operator.priority;
                    }).reduce(function (acc, v) {
                        return v > acc ? v : acc;
                    }, Number.MIN_VALUE);
                    for (var i = 0; i < tokens.length; i++) {
                        if (tokens[i].type === TokenType.Operator && tokens[i].operator.priority === maxPriority) {
                            var leftOperand = processTokens.pop();
                            var operator = tokens[i].operator;
                            var rightOperand = tokens[i + 1];
                            var evalValue = operator.eval(Number(leftOperand.value), Number(rightOperand.value));
                            processTokens.push({"value": evalValue, "rawValue": evalValue, "type": TokenType.Number});
                            i++;
                        } else {
                            processTokens.push(tokens[i])
                        }
                    }
                    tokens = processTokens;
                    processTokens = [];
                }
                if (tokens.length === 0) {
                    throw new Error('Unexpected error');
                }
                return tokens[0].value;
            },

            assert: function(prevToken, currentToken)
            {
                if (prevToken == undefined && currentToken.type.expectAfter.indexOf("Empty") !== -1)
                    return;
                if (prevToken !== undefined && currentToken.type.expectAfter.indexOf(prevToken.type.name) !== -1)
                    return;
                throw Error("Invalid formula");
            },

            clear: function(str)
            {
                return str.replace(/\s+/g,"");
            },

            extractNumber: function(str, allowMinus)
            {
                var regExp = new RegExp("^"+(allowMinus ? "[\-]?" : "")+"[0-9]*(?:[.][0-9]+)?","g");
                var match = regExp.exec(str);
                if (match === null || match.length === 0 || match[0].length === 0) return null;
                return { "value": match[0], "rawValue": match[0], "type": TokenType.Number };
            },

            extractOperator: function(str)
            {
                for(var i = 0; i < Operator.length; i++)
                {
                    var regExp = new RegExp("^"+ RegExp.escape(Operator[i].operator)+"","g");
                    var match = regExp.exec(str);
                    if (match !== null && match.length > 0)
                        return { "value": match[0], "rawValue": match[0], "operator": Operator[i], "type": TokenType.Operator }
                }
                return null;
            },

            extractExpression: function(str)
            {
                var regExp = /^(\(.*\))/g;
                var match = regExp.exec(str);
                if (match === null || match.length < 2) return null;

                var brackets = ['('];
                var value = match[0];
                for (var i = 1; i < value.length; i++)
                {
                    if (value[i] === '(') {
                        brackets.push('(');
                    }
                    if (value[i] === ')') {
                        brackets.pop();
                    }
                    if (brackets.length === 0) {
                        break;
                    }
                }
                value = value.substr(1, i-1);
                if (value === "") {
                    throw new Error("Invalid formula");
                }
                var e = new Evaluator();
                return { "value": e.eval(value), "rawValue": "("+value+")", "type": TokenType.Expression };
            }
        };

        if (RegExp.escape === undefined) {
        	RegExp.escape= function(s) {
        		return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        	};
        }

        export default Evaluator;
