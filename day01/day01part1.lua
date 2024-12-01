local leftNumbers = {}
local rightNumbers = {}

for l in io.lines("input") do
  local left, right = l:match("(%d+)   (%d+)")
  table.insert(leftNumbers, tonumber(left))
  table.insert(rightNumbers, tonumber(right))
end

table.sort(leftNumbers)
table.sort(rightNumbers)

local total = 0

for i = 1, #leftNumbers do
  total = total + math.abs(rightNumbers[i] - leftNumbers[i])
end

print(total)
