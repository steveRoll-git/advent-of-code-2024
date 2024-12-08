local rows = {}

local antennas = {}

do
  local y = 1
  for l in io.lines("input") do
    ---@cast l string
    local last = 1
    while true do
      local x, _, c = l:find("([^%.])", last)
      if x then
        antennas[c] = antennas[c] or {}
        table.insert(antennas[c], {
          x = x,
          y = y,
          c = c
        })
        last = x + 1
      else
        break
      end
    end
    table.insert(rows, l)
    y = y + 1
  end
end

local mapW = #rows[1]
local mapH = #rows

local function inMap(x, y)
  return x >= 1 and x <= mapW and y >= 1 and y <= mapH
end

local count = 0
local foundLocations = {}

for _, as in pairs(antennas) do
  for _, a1 in ipairs(as) do
    for _, a2 in ipairs(as) do
      if a1 ~= a2 then
        local dx, dy = a2.x - a1.x, a2.y - a1.y
        local x, y = a1.x, a1.y
        while inMap(x, y) do
          if not foundLocations[x .. " " .. y] then
            count = count + 1
            foundLocations[x .. " " .. y] = true
          end
          x, y = x - dx, y - dy
        end
      end
    end
  end
end

print(count)
