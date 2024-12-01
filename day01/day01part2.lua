local leftCounts = {}
local rightCounts = {}

for l in io.lines("input") do
  local left, right = l:match("(%d+)   (%d+)")
  left = tonumber(left)
  right = tonumber(right)
  leftCounts[left] = (leftCounts[left] or 0) + 1
  rightCounts[right] = (rightCounts[right] or 0) + 1
end

local total = 0

for number, count in pairs(leftCounts) do
  total = total + (number * count * (rightCounts[number] or 0))
end

print(total)
