local possibleOperators = {
  function(a, b)
    return a + b
  end,
  function(a, b)
    return a * b
  end,
}

local function tryOperators(target, operands, operators)
  local lastOperator = #operators
  if lastOperator == #operands - 1 then
    local total = operands[1]
    for i, o in ipairs(operators) do
      total = o(total, operands[i + 1])
    end
    return total == target
  end
  for _, o in ipairs(possibleOperators) do
    operators[lastOperator + 1] = o
    if tryOperators(target, operands, operators) then
      return true
    end
  end
  operators[lastOperator + 1] = nil
  return false
end

local count = 0

for l in io.lines("input") do
  local target, operandsStr = l:match("(%d+): (.+)")
  target = tonumber(target)
  local operands = {}
  for n in operandsStr:gmatch("%d+") do
    table.insert(operands, tonumber(n))
  end
  if tryOperators(target, operands, {}) then
    count = count + target
  end
end

print(count)
