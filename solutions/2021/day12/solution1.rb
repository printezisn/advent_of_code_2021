def small_cave?(cave)
  cave.downcase == cave
end

def distinct_paths(paths, cave = 'start', visited = {})
  return 1 if cave == 'end'
  return 0 if small_cave?(cave) && visited[cave]

  visited[cave] = true
  total = 0

  paths[cave].each do |next_cave|
    total += distinct_paths(paths, next_cave, visited)
  end

  visited[cave] = false

  total
end

paths = {}
path = File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  cave1, cave2 = line.chomp.split('-')

  paths[cave1] ||= []
  paths[cave1] << cave2

  paths[cave2] ||= []
  paths[cave2] << cave1
end

puts distinct_paths(paths)