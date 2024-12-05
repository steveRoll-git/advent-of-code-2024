local rules = {}

local total = 0

for l in io.lines("input") do
  if l:find("|") then
    local before, after = l:match("(%d+)|(%d+)")
    if not rules[before] then
      rules[before] = {}
    end
    rules[before][after] = false
    if not rules[after] then
      rules[after] = {}
    end
    rules[after][before] = true
  elseif l:find(",") then
    local update = {}
    for n in l:gmatch("%d+") do
      table.insert(update, n)
    end
    for i1, n1 in ipairs(update) do
      for i2, n2 in ipairs(update) do
        if (i2 ~= i1) and ((rules[n2][n1]) ~= (i2 > i1)) then
          goto notCorrect
        end
      end
    end
    total = total + update[math.floor(#update / 2) + 1]
    ::notCorrect::
  end
end

print(total)
