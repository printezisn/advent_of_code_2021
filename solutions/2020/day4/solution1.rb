required_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
passports = ['']
valid_passports = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  if line.chomp.empty?
    passports << ''
  else
    passports.last << " #{line.chomp}"
  end
end

passports.reject!(&:empty?)

passports.each do |passport|
  fields = passport.split.map  { |chunk| chunk.split(':').first }
  valid_passports += 1 if (fields & required_fields).size == required_fields.size
end

puts valid_passports
